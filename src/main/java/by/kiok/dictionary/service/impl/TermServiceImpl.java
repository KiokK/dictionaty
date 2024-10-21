package by.kiok.dictionary.service.impl;

import by.kiok.dictionary.dto.request.TermRequest;
import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import by.kiok.dictionary.exexception.NotFoundException;
import by.kiok.dictionary.mapper.TermMapper;
import by.kiok.dictionary.model.Chapter;
import by.kiok.dictionary.model.Term;
import by.kiok.dictionary.repository.ChapterRepository;
import by.kiok.dictionary.repository.TermRepository;
import by.kiok.dictionary.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static by.kiok.dictionary.util.LangConstants.CHINA;
import static by.kiok.dictionary.util.LangConstants.ENGLISH;
import static by.kiok.dictionary.util.LangConstants.RUSSIAN;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TermServiceImpl implements TermService {

    private final TermRepository termRepository;
    private final ChapterRepository chapterRepository;
    private final TermMapper termMapper;

    @Override
    public TermPage findAll(Pageable pageable) {
        Page<Term> terms = termRepository.findAll(pageable);
        Long count = termRepository.count();
        return termMapper.termsToTermPage(terms.getContent(), terms.getPageable(), count);
    }

    @Override
    public TermResponse findById(Long id) {
        return termRepository.findById(id)
                .map(termMapper::termToTermResponse)
                .orElseThrow(() -> NotFoundException.byId(id));
    }

    @Override
    public TermPage findByWord(String word, final String language, Pageable pageable) {
        List<Term> terms = new ArrayList<>();
        Long count = -1L;
        switch (language) {
            case RUSSIAN -> {
                terms = termRepository.findByWord_RussianStartsWithOrderByWord_Russian(word, pageable);
                count = termRepository.countByWord_RussianStartsWith(word);
            }
            case ENGLISH -> {
                terms = termRepository.findByWord_EnglishStartsWithOrderByWord_English(word, pageable);
                count = termRepository.countByWord_EnglishStartsWith(word);
            }
            case CHINA -> {
                terms = termRepository.findByWord_ChinaStartsWithOrderByWord_China(word, pageable);
                count = termRepository.countByWord_ChinaStartsWith(word);
            }
        }
        return termMapper.termsToTermPage(terms, PageRequest.of(0, terms.size(), Sort.unsorted()), count);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        termRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, TermRequest termRequest) {
        Term term = termRepository.findById(id)
                .map(t -> termMapper.toNewTerm(id, termRequest))
                .orElseThrow(() -> NotFoundException.byId(id));
        termRepository.save(term);
    }

    @Override
    @Transactional
    public TermResponse create(TermRequest termRequest) {
        Term term = termMapper.termRequestToTerm(termRequest);
        Chapter chapter = chapterRepository.findById(termRequest.getChapterId()).orElseThrow();
        chapter.getTerms().add(term);
        term = termRepository.save(termMapper.termRequestToTerm(termRequest));

        return termMapper.termToTermResponse(term);
    }
}
