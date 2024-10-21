package by.kiok.dictionary.service;

import by.kiok.dictionary.dto.request.TermRequest;
import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import org.springframework.data.domain.Pageable;

public interface TermService {

    TermPage findAll(Pageable pageable);

    TermResponse findById(Long id);

    TermPage findByWord(String word, String language, Pageable pageable);

    void deleteById(Long id);

    void update(Long id, TermRequest termRequest);

    TermResponse create(TermRequest termRequest);

}
