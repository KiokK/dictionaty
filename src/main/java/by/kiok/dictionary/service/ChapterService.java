package by.kiok.dictionary.service;

import by.kiok.dictionary.dto.response.ChapterInfoResponse;
import by.kiok.dictionary.dto.response.ChapterResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChapterService {

    List<ChapterInfoResponse> findAll();

    ChapterResponse findById(Long id, Pageable pageable);
}
