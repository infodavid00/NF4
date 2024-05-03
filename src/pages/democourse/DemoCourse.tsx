import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './democourse.scss';
import Flashcard from '../../components/flashcard/Flashcard.tsx';
import { ArrowLeftCircle, ArrowRightCircle, XCircle } from 'react-feather';

interface Chapter {
  id: number;
  title: string;
  content?: string;
  summary?: string;
  flashcards?: any[]; // Assuming flashcards data structure
}

const DemoCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flashcardBoxisOpened, setFlashcardBoxIsOpened] = useState(false);
  const [flashcardITEMDATA, setFlashcardITEMDATA] = useState<any[]>([]);
  const [flashcardITEMINDEX, setFlashcardITEMINDEX] = useState(0);
  const [fselectedNew, setFselectedNew] = useState('none');

  // States
  const [chaptersData, setChaptersData] = useState<Chapter[]>([]);
  const [summariesData, setSummariesData] = useState<Chapter[]>([]);
  const [flashcardsData, setFlashcardsData] = useState<Chapter[]>([]);
  const [searchTermChapters, setSearchTermChapters] = useState('');
  const [searchTermSummaries, setSearchTermSummaries] = useState('');
  const [searchTermFlashcards, setSearchTermFlashcards] = useState('');
  const [showAddFormChapters, setShowAddFormChapters] = useState(false);
  const [showAddFormFlashcards, setShowAddFormFlashcards] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`https://gp-ooo8.onrender.com/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const course = await response.json()
        const { chapters, summary, flashCards } = course.course;
        // console.log(chapters, summary, flashCards)

        // Set mock data if the response is empty
        setChaptersData(chapters || []);
        setSummariesData(summary || []);
        setFlashcardsData(flashCards || []);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
        // Set mock data if there's an error
        setChaptersData([]);
        setSummariesData([]);
        setFlashcardsData([]);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('title', formTitle);
    if (file) formData.append('pdf', file);

    try {
      await fetch(`https://gp-ooo8.onrender.com/chapters/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setFormTitle('');
      setFile(null);
      setFselectedNew('');
      setShowAddFormChapters(false);
    } catch (error) {
      console.error('Failed to add chapter:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFselectedNew(event.target.files[0].name);
    }
  };

  const TableComponent: React.FC<{
    title: string;
    data: Chapter[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    showAddForm?: boolean;
    setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ title, data, searchTerm, setSearchTerm, showAddForm = false, setShowAddForm = () => {} }) => {
    return (
      <>
        <div className="courses-header">
          <h2>{title}</h2>
          <div className="courses-toolbar">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">Search</button>
            </div>
            {title === 'Chapters' && (
              <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                +
              </button>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="add-course-form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required />
              </div>
              <div className="form-field">
                <label htmlFor="file">{title} File:</label>
                <input type="file" id="file" onChange={handleFileChange} />
                <div>File selected: {fselectedNew}</div>
              </div>
              <button type="submit">Add {title}</button>
            </form>
          </div>
        )}

        <div className="courses-table-container">
          <table className="courses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      {!item.flashcards && <td>{item.content || item.summary}</td>}
                      {item.flashcards && (
                        <td>
                          <button
                            style={{
                              padding: 12,
                              borderRadius: 20,
                              border: 'none',
                              outline: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              backgroundColor: '#4C5B78',
                            }}
                            onClick={() => {
                              setFlashcardITEMDATA(item.flashcards ?? []);
                              setFlashcardBoxIsOpened(true);
                            }}
                          >
                            open flashcard
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="courses-container">
        <h1 className="courses-title">Demo Course Page</h1>
        <TableComponent
          title="Chapters"
          data={chaptersData}
          searchTerm={searchTermChapters}
          setSearchTerm={setSearchTermChapters}
          showAddForm={showAddFormChapters}
          setShowAddForm={setShowAddFormChapters}
        />
        <TableComponent
          title="Summary"
          data={summariesData}
          searchTerm={searchTermSummaries}
          setSearchTerm={setSearchTermSummaries}
        />
        <TableComponent
          title="Flashcard"
          data={flashcardsData}
          searchTerm={searchTermFlashcards}
          setSearchTerm={setSearchTermFlashcards}
          showAddForm={showAddFormFlashcards}
          setShowAddForm={setShowAddFormFlashcards}
        />
      </div>

      {flashcardBoxisOpened && (
        <div id="Flahscard-modal-box-110">
          <XCircle
            onClick={() => setFlashcardBoxIsOpened(false)}
            width={24}
            height={24}
            color="black"
            fill="white"
            style={{
              position: 'fixed',
              top: 15,
              left: 15,
            }}
          />
          <Flashcard arr={flashcardITEMDATA} index={flashcardITEMINDEX} />
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1em',
            }}
          >
            <ArrowLeftCircle
              width={25}
              height={25}
              color="white"
              onClick={() => flashcardITEMINDEX !== 0 && setFlashcardITEMINDEX(flashcardITEMINDEX - 1)}
            />
            <div>
              {flashcardITEMINDEX + 1} out of {flashcardITEMDATA.length}
            </div>
            <ArrowRightCircle
              width={25}
              height={25}
              color="white"
              onClick={() => flashcardITEMINDEX < flashcardITEMDATA.length - 1 && setFlashcardITEMINDEX(flashcardITEMINDEX + 1)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DemoCourse;
