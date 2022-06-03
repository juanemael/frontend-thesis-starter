// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import Upload from "../../../models/Upload";

const FileUploaderSingle = ({setImageURL, createFunc, imageURL}) => {
  // ** State
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleUploadFile = async (event) =>{
    try {
      console.log(event)
      const upload = new Upload()
      const formData = new FormData()
      formData.append("upload", event[0],event.name)
      // formData.append("fileName", fileName)
      // console.log("ETF", event.target.files[0])

      const result = await upload.uploadImage(formData)
      console.log(result)
      setImageURL(result.location)
      console.log(imageURL)

    } catch (e) {
      console.log(e)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles)
      // setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      setFiles([...acceptedFiles.map(file => Object.assign(file))])
      handleUploadFile(acceptedFiles)
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const saveFile = e => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }


  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
    setImageURL("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Single Upload</CardTitle>
      </CardHeader>
      <CardBody>
        Tarik dan lepas atau upload langsung dengan klik tombol dibawah ini
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Tarik dan lepas atau upload langsung dengan klik tombol ini</h5>
            <p className='text-secondary'>
              Tarik file kamu disini atau klik{' '}
              <a href={'/sjph/kepentingan_produksi_dan_distribusi_produk'} onClick={handleUploadFile}>
                jelajahi
              </a>{' '}
              melalui komputer anda
            </p>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Remove All
              </Button>
              <Button color='primary' onClick={createFunc}>Upload Files</Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  )
}

export default FileUploaderSingle
