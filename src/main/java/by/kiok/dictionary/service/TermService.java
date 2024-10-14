package by.kiok.dictionary.service;

import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import org.springframework.data.domain.Pageable;

public interface TermService {

    TermPage findAll(Pageable pageable);

    TermResponse findById(Long id);

    TermPage findByWord(String word, String language);

}
