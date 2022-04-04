import './App.css';
import { useState } from 'react';

function Article(props) {
  return (
    <article>
      <h2>{ props.title }</h2>
      { props.body }
    </article>
  );
}

function Header(props){
  console.log('props', props, props.title);
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{ props.title }</a></h1>
    </header>
    );
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      {/* id가 숫자였지만, 태그의 속성으로 넘기면 문자열로 바뀐다. */}
      <a id={t.id} href={"/read"+t.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); // Number 문자를 숫자로 converting
        // event.target은 이벤트를 유발시킨 태그를 가르킨다. 여기서는 <a></a>
    }}>{t.title}</a></li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder='title' /></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder='title' value={title} onChange={(event)=>{
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name="body" placeholder='body' value={body} onChange={(event)=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  );
}

function App() {
  // const _mode = useState('Welcome'); // useState의 인자는 초기값 
  // const mode = _mode[0]; //state의 값은 [0]를 사용해서 읽음 
  // const setMode = _mode[1]; // state를 바꿀 때는 [1]인덱스의 값으로 함수로 바꾼다.
  //위의 3줄 축약
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title:'html', body:'html is ...'},
    {id: 2, title:'css', body:'css is ...'},
    {id: 3, title:'javascript', body:'javascript is ...'},
  ])
  let content = null;
  let contextControl = null; 
  if(mode === 'WELCOME'){
    content = <Article title="Welcom!!" body="Hellow, Web"></Article>
  } else if (mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <> 
    {/* <></> 태그를 묶어서 복수의 태그를 만드는 빈태그 */}
      <li><a href={'/update'+id}onClick={(event) => {
        event.preventDefault();
        setMode('UPDATE')
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
    </>
  } else if (mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title: _title, body: _body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if (mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title,body);
      const newTopics = [...topics]
      const updatedTopic = { id:id, title: title, body: body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ')
    }}></Update>
  }

  return (
    <div>
      <Header title="React" onChangeMode={() => {
        // 모드를 바꿀 때는 setMode 사용 
        setMode('WELCOME');
      }}></Header>
      <Header></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={(event) => {
          event.preventDefault();
          setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>  
    </div>
  );
}

export default App;
