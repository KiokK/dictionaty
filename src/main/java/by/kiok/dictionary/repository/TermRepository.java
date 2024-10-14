package by.kiok.dictionary.repository;

import by.kiok.dictionary.model.Term;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TermRepository extends JpaRepository<Term, Long> {

    List<Term> findByWord_RussianStartsWith(String russianWord);

    List<Term> findByWord_ChinaStartsWith(String chinaWord);

    List<Term> findByWord_EnglishStartsWith(String englishWord);

    List<Term> findByChapter_Id(Long chapterId, Pageable pageable);

    Long countByWord_RussianStartsWith(String russianWord);

    Long countByWord_ChinaStartsWith(String chinaWord);

    Long countByWord_EnglishStartsWith(String englishWord);

    Long countByChapter_Id(Long chapterId);
}
