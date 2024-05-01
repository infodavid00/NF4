import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./democourse.scss";
import Flashcard from "../../components/flashcard/Flashcard.jsx"
import {ArrowLeftCircle, ArrowRightCircle, XCircle } from "react-feather"

const DemoCourse = () => {
  const { id } = useParams();
  const [flashcardBoxisOpened, setflashcardBoxisOpened] = useState(false)
  const [flashcardITEMDATA, setFlashcardITEMDATA] = useState([])
  const [flashcardITEMINDEX, setflashcardITEMINDEX] = useState(0)
  const [fselectedNew, setfselectedNew] = useState('none')

  // States
  const [chaptersData, setChaptersData] = useState([]);
  const [summariesData, setSummariesData] = useState([]);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [searchTermChapters, setSearchTermChapters] = useState('');
  const [searchTermSummaries, setSearchTermSummaries] = useState('');
  const [searchTermFlashcards, setSearchTermFlashcards] = useState('');
  const [showAddFormChapters, setShowAddFormChapters] = useState(false);
  const [showAddFormFlashcards, setShowAddFormFlashcards] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`https://gp-ooo8.onrender.com/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        

        const { chapters, summary, flashCards } = response.data.course;
        
        setChaptersData(chapters);
        setSummariesData(summary);
        setFlashcardsData(flashCards);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('title', formTitle);
    if (file) formData.append('pdf', file);

    // Example POST request
    const z = await axios.post(`https://gp-ooo8.onrender.com/chapters/${id}`, formData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' 
      }
    });
    setFormTitle('');
    setFile(null);
    setfselectedNew('')
    setShowAddFormChapters(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Display filename (optional)
    if (event.target.files[0]) {
      const selectedFileName = event.target.files[0].name;
      setfselectedNew(selectedFileName)
    }
  };

  const TableComponent = ({ title, data, searchTerm, setSearchTerm, showAddForm, setShowAddForm }) => {
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
              <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>+</button>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="add-course-form">
            <form onSubmit={(e) => handleSubmit(e, title)}>
              <div className="form-field">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="file">{title} File:</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  // required
                />
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
              {data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  {!item.flashcards && <td>{item.content || item.summary}</td>}
                  { item.flashcards &&  <td><button style={{
                      padding: 12,
                      borderRadius: 20,
                      border: 'none',
                      outline: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      backgroundColor: '#4C5B78'
                  }} onClick={()=> {
                     setFlashcardITEMDATA(item.flashcards)
                     setflashcardBoxisOpened(true)
                  }}>open flashcard</button></td>}
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

    {flashcardBoxisOpened &&
      <div id="Flahscard-modal-box-110">
          <XCircle
             onClick={()=> setflashcardBoxisOpened(false)}
             width={24} height={24} color='black' fill="white"
             style={{
               position: 'fixed',
               top: 15,
               left: 15
             }}
          />
         <Flashcard arr={flashcardITEMDATA} index={flashcardITEMINDEX}/>
         <div style={{
             position: 'fixed',
             bottom: 0,
             left: 0,
             right: 0,
             display: 'flex',
             justifyContent:'space-between',
             alignItems: 'center',
             padding: '1em'
         }}>
           <ArrowLeftCircle 
             width={25} height={25} color='white'
             onClick={()=>
               flashcardITEMINDEX !== 0 &&
                 setflashcardITEMINDEX(flashcardITEMINDEX - 1)}
           />
           <div>{flashcardITEMINDEX + 1} out of {flashcardITEMDATA.length}</div>
           <ArrowRightCircle
             width={25} height={25} color='white'
             onClick={()=>
               flashcardITEMINDEX < flashcardITEMDATA.length - 1 &&
                 setflashcardITEMINDEX(flashcardITEMINDEX + 1)}
           />
         </div>
      </div>
    }
    </>
  );
};

export default DemoCourse;
