package by.kiok.dictionary.repository;

import by.kiok.dictionary.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
