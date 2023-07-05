import SoundPlayer from "./SoundPlayer";
import rain from "./soundEffects/rain.mp3"
import fire from "./soundEffects/fire.mp3"
import ocean from "./soundEffects/ocean.mp3"
import birds from "./soundEffects/birds.mp3"
import wind from "./soundEffects/windchime.mp3"
import insects from "./soundEffects/insects.mp3"
import "./ambientSounds.css"

const SoundPlayers = () => {
  return (
    <div className="ambientSounds">
      <SoundPlayer soundName={"rain"} audioFile={rain} icon={'fluent-emoji-high-contrast:umbrella-with-rain-drops'} color={"#72A0C1"} />
      <SoundPlayer soundName={"fire"} audioFile={fire} icon={'bi:fire'} color={"#d60000"}/>
      <SoundPlayer soundName={"ocean"} audioFile={ocean} icon={'streamline:travel-transportation-sail-ship-travel-boat-transportation-transport-ocean-ship-sea-water'} color={"#00308F"}/>
      <SoundPlayer soundName={"birds"} audioFile={birds} icon={'mdi:bird'} color={"#8d4004"}/>
      <SoundPlayer soundName={"wind"} audioFile={wind} icon={'ph:wind-bold'} color={"#242526"}/>
      <SoundPlayer soundName={"insects"} audioFile={insects} icon={'mdi:leaf'} color={"#355e3b"}/>
      
    </div>
  );
};

export default SoundPlayers;