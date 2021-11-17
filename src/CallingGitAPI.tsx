import {useState} from "react";
import "./CallingGitAPI.css";

const GitAPI = () => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState({});
  const [repo, setRepo] = useState([]);

  const _handleInputChange = (e: any) => {
    let {name, value} = e.target;
    setName(value);
  };
  const getUser = async () => {
    const responce = await fetch(`https://api.github.com/users/${name}`);
    const parseresponce = await responce.json();
    setProfile(parseresponce);
    const repo = parseresponce.repos_url;
    const repourldetails = await fetch(repo);
    const repoUrl = await repourldetails.json();
    setRepo(repoUrl);
  };
  return (
    <>
      <div className="border">
        <div className="search_btn">
          <input
            name="name"
            type="text"
            placeholder="Enter here"
            onChange={_handleInputChange}
          />
          <button onClick={getUser}>Search</button>
        </div>
        <div className="displayflex">
          <div className="repodetails">
            <img
              src={profile.avatar_url}
              style={{border: "1px solid"}}
              width="150px"
              alt=""
            />
            <div className="repo">Name : {profile.login}</div>
            <div className="repo">Id : {profile.id}</div>
            <div className="repo">
              UserProfile:
              <a href={profile.html_url} target="blank">
                click
              </a>
            </div>
          </div>
          <div className="repodetails_2">
            <h1 className="h1">User Repositories Details</h1>
            {repo.map((items: any) => {
              return (
                <div key={items.id}>
                  <a
                    href={items.html_url}
                    style={{padding: "5px"}}
                    className="repo_link"
                    target="_blank"
                  >
                    {items.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default GitAPI;
