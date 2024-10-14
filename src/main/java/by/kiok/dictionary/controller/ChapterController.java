package by.kiok.dictionary.controller;

import by.kiok.dictionary.dto.response.ChapterInfoResponse;
import by.kiok.dictionary.dto.response.ChapterResponse;
import by.kiok.dictionary.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    @GetMapping("/{id}/terms")
    public ResponseEntity<ChapterResponse> getByChapterId(@RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "10") Integer size,
                                                          @PathVariable Long id) {
        return ResponseEntity.ok(chapterService.findById(id, PageRequest.of(page, size, Sort.unsorted())));
    }

    @GetMapping
    public ResponseEntity<List<ChapterInfoResponse>> getAll() {
        return ResponseEntity.ok(chapterService.findAll());
    }

}
