import { useState } from "react";

export default function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.vaule;
        props.onUpdate(title, body);
      }}>
        {/* value={ title } update전의 원래 title 값 불러와서 보여줌 */}
        <p><input type="text" name="title" placeholder="title" value={ title } onChange={(event)=>{
          setTitle(event.target.value);
        }}></input></p>
        <p><textarea name="body" placeholder="body" value={ body } onChange={(event) => {
          setBody(event.target.value);
        }} ></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  );
}