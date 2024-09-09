import liff, { Liff } from "@line/liff";
import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [liffObject, setLiffObject] = useState<Liff>();

  useEffect(() => {
    initializeLiff();
  }, []);

  // liffの初期化
  const initializeLiff = async () => {
    try {
      await liff.init({
        liffId: '2006286965-zwb6bj19',
        withLoginOnExternalBrowser: true,
      });
      setLiffObject(liff);
      
      liff
      .getProfile()
      .then((profile) => {
        console.log("get profile name is : ", profile.displayName)
      })
      .catch(() => {
        console.log("get profile failed");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // シェアターゲットピッカーによるメッセージシェア
  const shareMessage = async () => {
    if (!liffObject) {
      console.log("LIFF is not initialized");
      return;
    }

    try {
      await liffObject.shareTargetPicker([
        {
          type: "text",
          text: message,
        },
      ]);
    } catch (error) {
      console.log("error shareTargetPicker : ", error);
    }
  };

  if (!liffObject) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>シェアターゲットピッカー デモ</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button onClick={shareMessage}>メッセージをシェアする</button>
    </div>
  );
};

export default App;
