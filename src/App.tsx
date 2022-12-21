/// <reference types="react-scripts" />

import React, {useState} from 'react';
import "./App.css"
import data from './data.json';
import BGHeader from "./images/bg-header-desktop.svg"
import CircleIcon from '@mui/icons-material/Circle';

type TagProps = {
    text: string
}

type ListingProps = {
    company: string,
    logo: string,
    new: boolean,
    featured: boolean,
    position: string,
    role: string,
    level: string,
    postedAt: string,
    contract: string,
    location: string,
    languages: string[],
    tools: string[],
    tags: string[]
}

function Tag(props: TagProps) {
    return <div className="tag">
        <p>{props.text}</p>
    </div>
}

function Listing(props: ListingProps) {
    
    return <div className="listing">

        <div className="left-side">

            {props.featured && <div className="featured-line"></div>}

            <div className="information">
                <div className="logo">
                    <img src={props.logo} alt={props.company + "logo"}></img>
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

        <div className="tags">
            <Tag text={props.role}/>
            <Tag text={props.level}/>
            {
                props.languages.map((it, index) => <Tag key={index} text={it}/>)
            }
            {
                props.tools.map((it, index) => <Tag key={index} text={it}/>)
            }

        </div>

    </div>
}

function FilterTab() {
    const [tags, setTags] = useState<TagProps[]>([])

    const removeTag = (tag: TagProps) => {

    }

    return <div className="filter-tab">
        {
            tags.map(it => <div>
                <Tag text={it.text}/>
                <div onClick={() => removeTag(it)}>
                    <img src={"./images/icon-remove.svg"} alt="Action - remove tag"/>
                </div>
            </div>)
        }

    </div>
}

function filterListings(data: ListingProps[], tags: TagProps[]): ListingProps[] {
    const listings = []
    for (const listing of data) {
        for (const tag of tags) {
            if (listing.tags.includes(tag.text))
                listings.push(listing)
        }
    }

    return listings
}

function App() {
    const [tags, setTags] = useState<TagProps[]>([])

    const addTags = (tag: TagProps) => {
        setTags(prevState => [...prevState, tag])
    }

    const listing = <div>

    </div>

    return (
        <div className="app">

            <div className="listings">
                {
                    data.map(it => <Listing key={it.id}
                                            logo={it.logo}
                                            company={it.company}
                                            position={it.position}
                                            languages={it.languages}
                                            tools={it.tools}
                                            contract={it.contract}
                                            featured={it.featured}
                                            level={it.level}
                                            location={it.location}
                                            new={it.new}
                                            postedAt={it.postedAt}
                                            role={it.role}
                                            tags={[it.position, it.role, ...it.languages, ...it.tools]}


                    />)
                }
            </div>
        </div>
    );
}

export default App;
