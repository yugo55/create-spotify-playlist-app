interface GeneratePlaylistPopupProps {
  onClose: () => void;
}

export default function GeneratePlaylistPopup({ onClose }: GeneratePlaylistPopupProps) {
  return (
    <div className="w-screen h-screen bg-gray-600 bg-opacity-30 fixed inset-0">
      <div className="fixed inset-14 m-auto bg-gray-300 p-5 rounded-md">
        <button className="block text-xl ml-auto hover:opacity-70" onClick={onClose}>✖</button>
        <p className="text-black text-xl font-semibold">アーティスト</p>
        <ul className="flex flex-wrap">
          <li className="mx-2"><input type="checkbox" id="SUPER BEAVER" name="SUPER BEAVER" /><label htmlFor="SUPER BEAVER">SUPER BEAVER</label></li>
          <li className="mx-2"><input type="checkbox" id="go!go!vanillas" name="go!go!vanillas" /><label htmlFor="go!go!vanillas">go!go!vanillas</label></li>
          <li className="mx-2"><input type="checkbox" id="Aimer" name="Aimer" /><label htmlFor="Aimer">Aimer</label></li>
          <li className="mx-2"><input type="checkbox" id="sumika" name="sumika" /><label htmlFor="sumika">sumika</label></li>
          <li className="mx-2"><input type="checkbox" id="Hump Back" name="Hump Back" /><label htmlFor="Hump Back">Hump Back</label></li>
          <li className="mx-2"><input type="checkbox" id="RADWIMPS" name="RADWIMPS" /><label htmlFor="RADWIMPS">RADWIMPS</label></li>
          <li className="mx-2"><input type="checkbox" id="星野 源" name="星野 源" /><label htmlFor="星野 源">星野 源</label></li>
          <li className="mx-2"><input type="checkbox" id="マカロニえんぴつ" name="マカロニえんぴつ" /><label htmlFor="マカロニえんぴつ">マカロニえんぴつ</label></li>
          <li className="mx-2"><input type="checkbox" id="Vaundy" name="Vaundy" /><label htmlFor="Vaundy">Vaundy</label></li>
          <li className="mx-2"><input type="checkbox" id="川崎鷹也" name="川崎鷹也" /><label htmlFor="川崎鷹也">川崎鷹也</label></li>
          <li className="mx-2"><input type="checkbox" id="Mrs. GREEN APPLE" name="Mrs. GREEN APPLE" /><label htmlFor="Mrs. GREEN APPLE">Mrs. GREEN APPLE</label></li>
          <li className="mx-2"><input type="checkbox" id="カネコアヤノ" name="カネコアヤノ" /><label htmlFor="カネコアヤノ">カネコアヤノ</label></li>
          <li className="mx-2"><input type="checkbox" id="大森元貴" name="大森元貴" /><label htmlFor="大森元貴">大森元貴</label></li>
        </ul>
        <button className="block ml-auto text-xl font-semibold bg-green-500 py-1 w-20 rounded-full hover:opacity-70">作成</button>
      </div>
    </div>
  );
}