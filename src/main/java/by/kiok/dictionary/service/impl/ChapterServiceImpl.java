package by.kiok.dictionary.service.impl;

import by.kiok.dictionary.dto.request.ChapterRequest;
import by.kiok.dictionary.dto.response.ChapterInfoResponse;
import by.kiok.dictionary.dto.response.ChapterResponse;
import by.kiok.dictionary.exexception.NotFoundException;
import by.kiok.dictionary.mapper.ChapterMapper;
import by.kiok.dictionary.model.Chapter;
import by.kiok.dictionary.model.Term;
import by.kiok.dictionary.repository.ChapterRepository;
import by.kiok.dictionary.repository.TermRepository;
import by.kiok.dictionary.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final ChapterMapper chapterMapper;
    private final TermRepository termRepository;

    @Override
    public List<ChapterInfoResponse> findAll() {
        List<Chapter> chapters = chapterRepository.findAll();
        return chapterMapper.toListChapterInfoResponse(chapters);
    }

    @Override
    public ChapterResponse findById(Long id, Pageable pageable) {
        Chapter chapter = chapterRepository.findById(id).orElseThrow(()-> NotFoundException.byId(id));
        List<Term> terms = termRepository.findByChapter_Id(id, pageable);
        long totalCountTerms = termRepository.countByChapter_Id(id);
        return chapterMapper.toChapterResponse(chapter, terms, pageable, totalCountTerms);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        chapterRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, ChapterRequest request) {
        Chapter curr = chapterRepository.findById(id)
                .map(c -> chapterMapper.chapterRequestToChapter(id, request))
                .orElseThrow(()-> NotFoundException.byId(id));
        chapterRepository.save(curr);
    }

    @Override
    @Transactional
    public ChapterInfoResponse create(ChapterRequest request) {
        Chapter newchapter = chapterMapper.chapterRequestToChapter(request);
        newchapter = chapterRepository.save(newchapter);
        return chapterMapper.toChapterInfoResponse(newchapter);
    }
}
