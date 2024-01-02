import { useState } from "react";
import ReactHowler from "react-howler";
import VolumeSlider from "./Slider";
import { Icon } from "@iconify/react";
import { newShade } from "../../utils/newShade";
import { buttonClick } from "../../assets/functions/clickSound";
import { useSelector } from "react-redux";

const SoundPlayer = ({ soundName, audioFile, icon,color }) => {
  const reduxtheme= useSelector((state)=>state.theme.theme)
  const theme = reduxtheme.color
  const textColor = reduxtheme.text?? 'black'
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const toggleAudioPlay = () => {
    buttonClick.play();
    setPlaying(!playing);
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
  };
  return (
    <div
      id="soundPlayer"
   
    >
      <button onClick={toggleAudioPlay} className="ambientButton">
        <Icon icon={icon} style={{ color: playing ? color : textColor ,fontSize:"30px"}} />
      </button>
      <VolumeSlider
        value={volume}
        min={0}
        max={1}
        step={0.1}
        onChange={handleVolumeChange}
        isVertical={false}
      />
      <ReactHowler
        src={audioFile}
        playing={playing}
        loop={true}
        volume={volume}
      />
    </div>
  );
};

export default SoundPlayer;
