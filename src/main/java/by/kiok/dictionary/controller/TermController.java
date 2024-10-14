package by.kiok.dictionary.controller;

import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/terms")
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<TermPage> getAll(@RequestParam(defaultValue = "0") Integer page,
                                           @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(
                termService.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "word"))));
    }

    @GetMapping("/find")
    public ResponseEntity<TermPage> getByPartAndLang(@RequestParam String part, @RequestParam String lang) {
        return ResponseEntity.ok(termService.findByWord(part, lang));
    }
}
