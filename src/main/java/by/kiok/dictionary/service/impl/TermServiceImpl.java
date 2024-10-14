package by.kiok.dictionary.service.impl;

import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import by.kiok.dictionary.exexception.NotFoundException;
import by.kiok.dictionary.mapper.TermMapper;
import by.kiok.dictionary.model.Term;
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
    public TermPage findByWord(String word, final String language) {
        List<Term> terms = new ArrayList<>();
        Long count = -1L;
        switch (language) {
            case RUSSIAN -> {
                terms = termRepository.findByWord_RussianStartsWith(word);
                count = termRepository.countByWord_RussianStartsWith(word);
            }
            case ENGLISH -> {
                terms = termRepository.findByWord_EnglishStartsWith(word);
                count = termRepository.countByWord_EnglishStartsWith(word);
            }
            case CHINA -> {
                terms = termRepository.findByWord_ChinaStartsWith(word);
                count = termRepository.countByWord_ChinaStartsWith(word);
            }
        }
        return termMapper.termsToTermPage(terms, PageRequest.of(0, terms.size(), Sort.unsorted()), count);
    }
}
