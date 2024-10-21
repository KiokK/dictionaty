import React, {useState, useEffect} from 'react';
import {getMessages, findWordsByPartAndLang} from '../service/QuerySenderService';

import {FormattedMessage} from 'react-intl'
import Header from "./Header";
import {Link, replace, useNavigate, useParams, useSearchParams} from "react-router-dom";

const WordComponent = () => {
    const navigate = useNavigate();
    const props = useParams();
    const [params, setParams] = useSearchParams();
    const [termPage, setTermPage] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [findWord, setFindWord] = useState('');
    const [page, setPage] = useState((params.get("page")) ? params.get("page") : 0);
    const [count, setCount] = useState(6);
    const [pageSize, setPageSize] = useState((params.get("size") !== null) ? params.get("size") : 15);
    const [chapterId, setChapterId] = useState((props.chapterId) ? props.chapterId : 0);

    const getOffset = () => {
        return pageSize * page;
    }

    const getWordNumber = (index) => {
        // console.log("params="+params.get("page"))
        return index + 1 + getOffset();
    }

    useEffect(() => {
        handleFindWordByChapter(chapterId)
    }, []);

    const handleFindWordByChapter = async (chapterId) => {
        try {
            const lang = document.getElementById('selectLang').value;

            const chapterResponse = await findWordsByPartAndLang(`chapters/${chapterId}/terms?page=${page}&size=${pageSize}`);

            const chaptersData = await getMessages("chapters");
            setChapters(chaptersData);
            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse.termPage : []);
            setCount(Math.ceil((chapterResponse.termPage.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed handleFindWordByChapter', error);
            setTermPage([]);
        }
    }
    const handleFindWordByChapter2 = async (e) => {
        e.preventDefault()
        try {
            setChapterId(document.getElementById('selectChapter').value)
            setPage(0)
            const chapterResponse = await findWordsByPartAndLang(`chapters/${
                document.getElementById('selectChapter').value
            }/terms?page=${page}&size=${pageSize}`);

            const chaptersData = await getMessages("chapters");
            setChapters(chaptersData);
            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse.termPage : []);
            setCount(Math.ceil((chapterResponse.termPage.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed handleFindWordByChapter2', error);
            setTermPage([]);
        }
    }

    const handleFindWord = async (e) => {
        try {
            const lang = document.getElementById('selectLang').value;
            setParams({part: findWord, lang: lang, page: page, size: pageSize});
            const data = await findWordsByPartAndLang(`terms/find?part=${findWord}&lang=${lang}&page=${page}&size=${pageSize}`, {});

            setTermPage(data);
            setCount(Math.ceil((data.totalElements / pageSize)))
        } catch (error) {
            console.error('Failed handleFindWord', error);
            setTermPage([]);
        }
    };

    const goToNextPage = async (e, page) => {
        try {
            setChapterId(document.getElementById('selectChapter').value)
            setPage(page)
            const chapterResponse = await findWordsByPartAndLang(`chapters/${chapterId}/terms?page=${page}&size=${pageSize}`);

            // console.log(`chapters/${chapterId}/terms?page=${page}&size=${pageSize}`);
            const chaptersData = await getMessages("chapters");
            setChapters(chaptersData);
            setTermPage((chapterResponse.termPage?.terms?.length !== 0) ? chapterResponse.termPage : []);
            setCount(Math.ceil((chapterResponse.termPage.totalElements / pageSize)))

        } catch (error) {
            console.error('Failed goToNextPage by', error);
            setTermPage([]);
        }
    }

    return (
        <div>
            <Header/>
            <div className="App">
                {/*<h1>Заголовок</h1>*/}
                <br/>
                <form>
                    <label htmlFor="chapter"><FormattedMessage id='find_words_by_chapter'/>: </label>
                    <select id="selectChapter" name="chapter" className="custom-select m-2" style={{width: '200px'}}>
                        <option disabled>Выбрать</option>
                        {chapters?.map((chapter) => (
                            (chapter.id == props.chapterId) ?
                                <option value={chapter.id} key={chapter.id}
                                        selected="true"> {chapter.english} - {chapter.russian} - {chapter.china} </option> :

                                <option value={chapter.id}
                                        key={chapter.id}> {chapter.english} - {chapter.russian} - {chapter.china} </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-success" onClick={handleFindWordByChapter2}>
                        <FormattedMessage id='find_words'/>
                    </button>
                </form>
                <br/>
                <form>
                    <label htmlFor="language"><FormattedMessage id='find_words_by_part'/>: </label>
                    <select id="selectLang" name="lang" className="custom-select m-2" style={{width: '200px'}}>
                        <option disabled><FormattedMessage id='select'/></option>
                        <option value="ru"><FormattedMessage id='russian'/></option>
                        <option value="en"><FormattedMessage id='english'/></option>
                        <option value="ch"><FormattedMessage id='china'/></option>
                    </select>
                    <input
                        type="text" value={findWord}
                        onChange={(e) => setFindWord(e.target.value)}
                        placeholder="..."
                    />
                    <button type="button" className="btn btn-success m-2" onClick={handleFindWord}><FormattedMessage
                        id='find_words'/></button>
                </form>
            </div>
            <br/>
            <div className="container px-4 cen">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        {(document?.getElementById('selectLang') === null || document?.getElementById('selectLang')?.value === 'ru') ? <>
                                <th scope="col">
                                    <div className='text-center'><FormattedMessage id='russian'/></div>
                                </th>
                                <th scope="col">
                                    <div className='text-center'><FormattedMessage id='english'/></div>
                                </th>
                                <th scope="col">
                                    <div className='text-center'><FormattedMessage id='china'/></div>
                                </th>
                            </> :
                            (document.getElementById('selectLang').value === 'en') ? <>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='english'/></div>
                                    </th>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='russian'/></div>
                                    </th>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='china'/></div>
                                    </th>
                                </> :
                                <>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='china'/></div>
                                    </th>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='russian'/></div>
                                    </th>
                                    <th scope="col">
                                        <div className='text-center'><FormattedMessage id='english'/></div>
                                    </th>
                                </>
                        }
                        <th scope="col">
                            <div className='text-center'><FormattedMessage id='transcription'/></div>
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {termPage?.terms?.map((term, index) => (
                        <tr key={"table_" + term.id}>
                            <th scope="row" width='3%'>{getWordNumber(index)}.</th>
                            {(document?.getElementById('selectLang')?.value === 'ru') ? <>
                                    <td className='text-center'>{term.russian}</td>
                                    <td className='text-center'>{term.english}</td>
                                    <td className='text-center'>{term.china}</td>
                                </> :
                                (document.getElementById('selectLang').value === 'en') ?
                                    <>
                                        <td className='text-center'>{term.english}</td>
                                        <td className='text-center'>{term.russian}</td>
                                        <td className='text-center'>{term.china}</td>
                                    </> : <>
                                        <td className='text-center'>{term.china}</td>
                                        <td className='text-center'>{term.russian}</td>
                                        <td className='text-center'>{term.english}</td>
                                    </>
                            }
                            <td className='text-center'>[{term.transcription}]</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {(termPage?.length === 0) ? <FormattedMessage id='nothing_find'/> : ""}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item  list-group-item disabled">
                            <a className="text-success" href="#" tabIndex="-1"> <FormattedMessage id='previous'/></a>
                        </li>
                        {[...Array(count)].map((e, i) => (
                            <li className={"list-group-item page-item text-success " + (i === page ? "bg-light" : "")}
                                onClick={(elem) => {
                                    goToNextPage(elem, i)
                                }}
                                key={"pageIndex_" + i}
                            >{i + 1}</li>
                        ))}
                        <li className="page-item list-group-item disabled">
                            <a className="text-success" href="#"> <FormattedMessage id='next'/></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default WordComponent;
