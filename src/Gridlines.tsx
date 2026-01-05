import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Canvas from './Canvas';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const gridOptions = [
  { rows: 3, cols: 3, label: '3*3' },
  { rows: 4, cols: 4, label: '4*4' },
];
const linesColors = [
  { color: '白色', value: 'rgba(255, 255, 255, 0.5)' },
  { color: '黑色', value: 'rgba(0, 0, 0, 0.5)' },
]

function Gridlines() {
  const [showOptions, setShowOptions] = useState(true);
  const [files, setFiles] = useState<FileList | null>(null);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [linesColor, setLinesColor] = useState(linesColors[0].value);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };
  const changeFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  const onCanvasClick = () => {
    console.log('Canvas clicked');
    setShowOptions(!showOptions);
    changeFullscreen();
  }

  return (
    <>
      <div className={`container mx-auto h-screen flex items-center flex-col ${showOptions ? 'p-3' : ''}`} >
        <div className='flex flex-col' style={{ display: showOptions ? '' : 'none' }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            上傳圖片
            <VisuallyHiddenInput
              type="file"
              onChange={onFileChange}
              multiple
            />
          </Button>
          <div className='flex my-3 gap-3'>
            {
              gridOptions.map((option, index) => (
                <Button
                  key={index}
                  component="label"
                  role={undefined}
                  variant={rows === option.rows && cols === option.cols ? "contained" : "outlined"}
                  tabIndex={-1}
                  className="ml-3"
                  onClick={() => {
                    setRows(option.rows);
                    setCols(option.cols);
                  }}
                >
                  {option.label}
                </Button>
              ))
            }
            {
              linesColors.map((lineOption, index) => (
                <Button
                  key={index}
                  component="label"
                  role={undefined}
                  variant={linesColor === lineOption.value ? "contained" : "outlined"}
                  tabIndex={-1}
                  className="ml-3"
                  onClick={() => {
                    setLinesColor(lineOption.value);
                  }}
                >
                  {lineOption.color}
                </Button>
              ))
            }
          </div>
        </div>
        <div className="flex-1 overflow-hidden" onClick={onCanvasClick}>
          <Canvas files={files} rows={rows} cols={cols} linesColor={linesColor} />
        </div>
      </div>
    </>
  )
}

export default Gridlines
