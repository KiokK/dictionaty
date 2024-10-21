package by.kiok.dictionary.controller;

import by.kiok.dictionary.dto.request.TermRequest;
import by.kiok.dictionary.dto.response.TermPage;
import by.kiok.dictionary.dto.response.TermResponse;
import by.kiok.dictionary.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/terms")
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<TermPage> getAll(@RequestParam(defaultValue = "0") Integer page,
                                           @RequestParam(defaultValue = "15") Integer size) {
        return ResponseEntity.ok(
                termService.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "word"))));
    }

    @GetMapping("/find")
    public ResponseEntity<TermPage> getByPartAndLang(@RequestParam String part, @RequestParam String lang,
                                                     @RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "15") Integer size) {
        return ResponseEntity.ok(termService.findByWord(
                part, lang, PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "word"))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        termService.deleteById(id);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody TermRequest request) {
        termService.update(id, request);

        return ResponseEntity.status(200).build();
    }

    @PostMapping("/create")
    public ResponseEntity<TermResponse> create(@RequestBody TermRequest request) {

        return ResponseEntity.ok(termService.create(request));
    }
}
