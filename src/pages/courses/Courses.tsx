import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./courses.scss";

interface Course {
  _id: string;
  title: string;
  description: string;
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [newCourseTitle, setNewCourseTitle] = useState<string>('');
  const [newCourseDescription, setNewCourseDescription] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('https://gp-ooo8.onrender.com/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCourseClick = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://gp-ooo8.onrender.com/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newCourseTitle,
          description: newCourseDescription
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      setNewCourseTitle('');
      setNewCourseDescription('');
      setShowAddForm(false);
      // Optionally, refresh courses list
    } catch (error) {
      console.error('Failed to add course', error);
    }
  };

  const navigateToCoursePage = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1 className="courses-title">List of Courses</h1>
        <div className="courses-toolbar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">Search</button>
          </div>
          <button className="add-btn" onClick={handleAddCourseClick}>+</button>
        </div>
      </div>
      {showAddForm && (
        <form onSubmit={handleSubmitCourse} className="add-course-form">
          <input 
            type="text"
            placeholder="Course Title"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
          />
          <textarea 
            placeholder="Course Description"
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
          />
          <button type="submit">Add Course</button>
        </form>
      )}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase())).map((course, index) => (
              <tr key={index} onClick={() => navigateToCoursePage(course._id)} style={{cursor: 'pointer'}}>
                <td>{course.title}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
