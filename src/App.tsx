/// <reference types="react-scripts" />

import React, {useState} from 'react';
import "./App.css"
import data from './data.json';
import BGHeader from "./images/bg-header-desktop.svg"
import CircleIcon from '@mui/icons-material/Circle';
import removeIcon from "./images/icon-remove.svg";

type TagProps = {
    text: string,
    onAdd(): void
}

type ListingProps = {
    company: string,
    logo: string,
    new: boolean,
    featured: boolean,
    position: string,
    postedAt: string,
    contract: string,
    location: string,
    tags: string[]
}

function Tag(props: TagProps) {
    return <div onClick={props.onAdd} className="tag">
        <p>{props.text}</p>
    </div>
}

function ListingInfo(props: ListingProps) {

    return <div className="left-side">
        {props.featured && <div className="featured-line"></div>}
        <div className="information">
            <div className="logo">
                <img src={props.logo} alt={props.company + " logo"}></img>
            </div>
            <div className="details">
                <div className="company">
                    <strong className="company-name">{props.company}</strong>
                    {props.new && <strong className="new-tag">NEW!</strong>}
                    {props.featured && <strong className="featured-tag">FEATURED</strong>}
                </div>
                <h3>{props.position}</h3>
                <div className="other-details">
                    <p>{props.postedAt}</p>
                    <CircleIcon sx={{fontSize: "5px", color: "#d3d3d3"}}/>
                    <p>{props.contract}</p>
                    <CircleIcon sx={{fontSize: "5px", color: "#d3d3d3"}}/>
                    <p>{props.location}</p>
                </div>
            </div>
        </div>
    </div>
}

function App() {
    const [tags, setTags] = useState<string[]>([])

    const addTag = (text: string) => {
        if (!tags.includes(text)) {
            setTags(prevState => [...prevState, text])
        }
    }

    const removeTag = (text: string) => {
        const updatedTags = tags.filter(tag => tag !== text);
        setTags(updatedTags)
    }

    const cleanData = () => {
        if (tags.length) {
            return data.filter(obj =>
                tags.every(str => obj.tools.includes(str) ||
                    obj.languages.includes(str) ||
                    str === obj.level || str === obj.role));
        }
        return [...data]
    }

    const filterTab = <div className="filter-tab">
        <div className="tab-tags">
            {
                tags.map(it => <div tabIndex={0} className="tab-tag" key={tags.indexOf(it)}>
                    <p className="tab-tag-name">{it}</p>
                    <div role="button" className="remove-icon" onClick={() => removeTag(it)}>
                        <img src={removeIcon} alt="Remove tag"/>
                    </div>
                </div>)
            }
        </div>
        <button onClick={() => setTags([])} className="clear-button">Clear</button>
    </div>

    return (
        <div className="app">
            <div className="header">
                <img className="bg-header" src={BGHeader} alt="" aria-hidden="true"></img>
            </div>
            <div className="listings">
                {tags.length > 0 ? filterTab : <div className="empty-tab"></div>}
                {
                    cleanData().map(it => <div key={it.id} className="listing">

                        <ListingInfo
                            logo={it.logo}
                            company={it.company}
                            position={it.position}
                            contract={it.contract}
                            featured={it.featured}
                            location={it.location}
                            new={it.new}
                            postedAt={it.postedAt}
                            tags={[it.position, it.role, ...it.languages, ...it.tools]}/>

                        <div className="tags">
                            <Tag onAdd={() => addTag(it.role)} text={it.role}/>
                            <Tag onAdd={() => addTag(it.level)} text={it.level}/>
                            {it.languages.map((it, index) => <Tag
                                onAdd={() => addTag(it)} key={index} text={it}/>)}
                            {it.tools.map((it, index) => <Tag onAdd={() => addTag(it)}
                                                              key={index} text={it}/>)}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default App;
