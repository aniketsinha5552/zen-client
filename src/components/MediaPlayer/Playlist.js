import React,{useState} from 'react'
import { Box, Typography,IconButton,TextField, Button } from '@mui/material'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { newShade } from '../../App'

const Playlist = ({theme,playlist,setPlaylist,setCurrentPlaylist}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

  const removeSong = (song) => {
    if(playlist.length === 1){
        alert("You can't remove the last song from the playlist")
    }
    else{
        setPlaylist(playlist.filter((item)=>item.title !== song.title))
    }  
  }
  const [link,setLink] = useState("")
  const handleLinkChange = (e,val) => {
        setLink(val)
  }

  const addToPlaylist = async(data) => {
    const url = data.url
    if(!url){
        alert("Please add a valid youtube URL");
        return;
    }
     // Fetch title of youtube video
     try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${url}&format=json`
        );
        const data = await response.json();
        const title = data.title;
        const song = {
            url:url,
            title:title
        }
        setPlaylist([...playlist,song])
      } catch (error) {
        alert("Please add a valid youtube URL");
        return;
      }
     reset() 
  }


  return (
    <Box sx={{height:"350px",width:"350px",backgroundColor:theme,p:2}}>
    <Typography variant="h6" style={{textAlign:"center",marginBottom:"10px"}}>Playlist 🎵</Typography>
    <form onSubmit={handleSubmit(addToPlaylist)}>
    <input className='input_song' placeholder="paste youtube link here" variant="outlined" size='small' fullWidth {...register("url",{required:true})}/>
    <button className='add_song' type='submit'>+</button>
    </form>

    <Box>
        {playlist.map((song,index)=>{
            return(
                <Box key={index} sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",":hover":{cursor:"pointer",backgroundColor:newShade(theme,-50)}}}>
                    <Typography variant="body1" onClick={()=>setCurrentPlaylist(song)}>{song.title}</Typography>
                    <IconButton onClick={()=>removeSong(song)}>
                        <Icon icon="fluent:delete-24-filled" style={{fontSize:"20px"}}/>
                    </IconButton>
                </Box>
            )
        })}
    </Box>
  </Box>
  )
}

export default Playlist