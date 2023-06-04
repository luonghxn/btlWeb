import React, { useEffect, useState } from 'react'
import './book.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

function Book() {
  const [book, setBook] = useState({})
  const [image, setImage] = useState({})
  const [editMode, setEditMode] = useState(false)
  const id = useLocation().pathname.split('/')[2]
  const inputProps = { disabled: true }
  const navigate = useNavigate()
  // console.log(location)

  // useEffect(() => {
  //   console.log('edit')
  //   console.log(editMode)
  //   if (editMode) {
  //     inputProps.disabled = false
  //   }
  //   console.log(inputProps)
  // }, [editMode])

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        let res
        try {
          res = await axios.get(`/api/books/${id}`)
          setBook(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
    }
  }, [id])
  console.log(book)

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/books', { ...book, image })
    console.log(res)
    // window.location.replace('/post/' + res.data._id)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEditMode(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`/api/books/${id}`, book)
      navigate('/books')
    } catch (err) {
      console.log(err)
    }
  }

  const handleImageUpload = async () => {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData()
    formData.append('file', files[0])
    // replace this with your upload preset name
    formData.append('upload_preset', 'my-uploads')
    const options = {
      method: 'POST',
      body: formData,
    }
    const res = await axios.post(
      'https://api.Cloudinary.com/v1_1/dahxl1611/image/upload',
      formData
    )
    setImage({
      url: res.data.url,
      filename: res.data.public_id,
    })
    console.log(files)
    console.dir(formData)
  }

  return (
    <div className='book'>
      <div className='bookWrapper'>
        <h1 className='bookTitle'>Book</h1>
        <form encType='multipart/form-data'>
          <div className='bookEle'>
            <div className='bookLeft'>
              <div className='leftRow'>
                <div className='leftRowElement'>
                  <label htmlFor='title' className='leftRowElementLabel'>
                    Title
                  </label>
                  {id ? (
                    <input
                      type='text'
                      className='leftRowElementInput'
                      id='title'
                      onChange={handleChange}
                      value={book.title || ''}
                      disabled={editMode ? false : true}
                      // {...inputProps}
                    />
                  ) : (
                    <input
                      type='text'
                      className='leftRowElementInput'
                      id='title'
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className='leftRowElement'>
                  <label htmlFor='author' className='leftRowElementLabel'>
                    Author
                  </label>
                  {id ? (
                    <input
                      type='text'
                      className='leftRowElementInput'
                      id='author'
                      onChange={handleChange}
                      value={book.author || ''}
                      disabled={editMode ? false : true}
                    />
                  ) : (
                    <input
                      type='text'
                      className='leftRowElementInput'
                      id='author'
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <div className='leftRow'>
                <div className='leftRowElement'>
                  <label htmlFor='desc' className='leftRowElementLabel'>
                    Description
                  </label>

                  {id ? (
                    <textarea
                      name='desc'
                      id='desc'
                      className='leftRowElementTextarea'
                      // cols='90'
                      rows='10'
                      onChange={handleChange}
                      value={book.desc || ''}
                      disabled={editMode ? false : true}
                    ></textarea>
                  ) : (
                    <textarea
                      name='desc'
                      id='desc'
                      className='leftRowElementTextarea'
                      // cols='90'
                      rows='10'
                      onChange={handleChange}
                    ></textarea>
                  )}
                </div>
              </div>
              <div className='leftRow'>
                <div className='leftRowElement'>
                  <label htmlFor='publishYear' className='leftRowElementLabel'>
                    Year of publication
                  </label>
                  {id ? (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='publishYear'
                      onChange={handleChange}
                      value={book.publishYear || ''}
                      disabled={editMode ? false : true}
                    />
                  ) : (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='publishYear'
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className='leftRowElement'>
                  <label htmlFor='pages' className='leftRowElementLabel'>
                    Pages
                  </label>
                  {id ? (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='pages'
                      onChange={handleChange}
                      value={book.pages || ''}
                      disabled={editMode ? false : true}
                    />
                  ) : (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='pages'
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <div className='leftRow'>
                <div className='leftRowElement'>
                  <label htmlFor='price' className='leftRowElementLabel'>
                    Price
                  </label>
                  {id ? (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='price'
                      onChange={handleChange}
                      value={book.price || ''}
                      disabled={editMode ? false : true}
                    />
                  ) : (
                    <input
                      type='number'
                      className='leftRowElementInput'
                      id='price'
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className='leftRowElement'>
                  <label htmlFor='author' className='leftRowElementLabel'>
                    Category
                  </label>
                  {!id && !editMode ? (
                    <select
                      name='leftRowElementInput'
                      id='category'
                      onChange={handleChange}
                    >
                      <option value='history'>History</option>
                      <option value='poetry'>Poetry</option>
                      <option value='business'>Business</option>
                      <option value='novel'>Novel</option>
                    </select>
                  ) : editMode ? (
                    <select
                      name='leftRowElementInput'
                      id='category'
                      onChange={handleChange}
                    >
                      <option value='history'>History</option>
                      <option value='poetry'>Poetry</option>
                      <option value='business'>Business</option>
                      <option value='novel'>Novel</option>
                    </select>
                  ) : (
                    <select
                      name='leftRowElementInput'
                      id='category'
                      onChange={handleChange}
                    >
                      <option value={book.category}>{book.category}</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className='bookRight'>
              {!id ? (
                <>
                  <label htmlFor='fileInput' className='fileInputLabel'>
                    Upload Image
                  </label>
                  <input
                    id='fileInput'
                    name='image'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  {image.url && (
                    <img className='bookImg' src={image.url} alt='' />
                  )}
                </>
              ) : (
                <img className='bookImg' src={book?.image?.url} alt='' />
              )}
            </div>
          </div>
          {id && !editMode ? (
            <button className='bookButton' onClick={handleEdit}>
              Edit
            </button>
          ) : editMode ? (
            <button className='bookButton' onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className='bookButton' onClick={handleSubmit}>
              Add
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Book
