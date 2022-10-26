import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [player, getPlayer] = useState([{}]);
  const [search, setSearch] = useState("adi");

  const changeValue = (data) => {
    setSearch(data.target.value);
  };

  useEffect(() => {
    const Anjay = async () => {
      const Api = await fetch(`https://api.genderize.io/?name=${search}`);
      const getApi = await Api.json();
      const set = new Set([getApi]);
      const result = Array.from(set).map((data) => {
        return {
          hitung: data.count,
          jenis: data.gender,
          nama: data.name,
          kemungkinan: data.probability,
        };
      });

      // console.log(result);
      getPlayer(result);
    };
    Anjay();
  }, [search]);

  return (
    <div>
      <p>
        <span class="input">
          <input onChange={changeValue} type="text" placeholder="NAME" />
          <span></span>
        </span>
        <p key={player.hitung}>count: {player[0].hitung}</p>
        <p key={player.nama}>name: {player[0].nama}</p>
        <p key={player.jenis}>gender: {player[0].jenis}</p>
        <p key={player.kemungkinan}>probability: {player[0].kemungkinan}</p>
      </p>
    </div>
  );
};

export default App;
