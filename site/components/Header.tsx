import { useMemo, useState } from "react";

import { NewAuthor, NewChannel, NewReport } from "../../analyzer/Analyzer";
import { dataProvider, DataProvider } from "../DataProvider";
import AuthorChip from "./chips/AuthorChip";

import ChannelChip from "./chips/ChannelChip";
import FilterSelect from "./FilterSelect";
import TimeSelector from "./TimeSelector";

interface Props {
    title: string;
    tab: string;
    setTab: (tab: string) => void;
}

const Tab = (props: {
    currentValue: string;
    value: string;
    children: React.ReactNode;
    onChange: (value: string) => void;
}) => {
    return <a
        className={props.currentValue === props.value ? "active" : ""}
        onClick={() => props.onChange(props.value)}
    >
        {props.children}
    </a>;
};

const Header = (props: Props) => {
    const { tab, setTab, title } = props;
    const report = dataProvider.getSource();

    const [selectedChannels, setSelectedChannels] = useState<NewChannel[]>([...report.channels]);
    const [selectedUsers, setSelectedUsers] = useState<NewAuthor[]>([...report.authors]);

    const channelChip = useMemo(() => (props: { data: NewChannel }) => <ChannelChip platform="discord" channel={props.data} />, []); // TODO: add platform dependency
    const authorChip = useMemo(() => (props: { data: NewAuthor }) => <AuthorChip platform="discord" author={props.data} />, []); // TODO: add platform dependency
    
    return (
        <div className="header">
            <h1>{title}</h1>
            <h2>chat analysis report</h2>
            <div className="filters">
                <div className="filter">
                    <label htmlFor="channels">Channels</label>
                    <FilterSelect
                        name="channels"
                        options={report.channels}
                        allText="All channels"
                        placeholder="Select channels..."
                        selected={selectedChannels}
                        onChange={setSelectedChannels}
                        optionColorHue={266}
                        chip={channelChip}
                    />
                </div>
                <div className="filter">
                    <label htmlFor="authors">Authors</label>
                    <FilterSelect
                        name="authors"
                        options={report.authors}
                        allText="All users"
                        placeholder="Select users..."
                        selected={selectedUsers}
                        // @ts-ignore
                        onChange={setSelectedUsers}
                        optionColorHue={240}
                        chip={authorChip}
                    />
                </div>
                <div className="filter" style={{ minWidth: "100%" }}>
                    <label htmlFor="authors">Time</label>
                    <TimeSelector/>
                </div>
            </div>
            <div className="menu">
                <Tab currentValue={tab} onChange={setTab} value="messages">Messages</Tab>
                <Tab currentValue={tab} onChange={setTab} value="language">Language</Tab>
                <Tab currentValue={tab} onChange={setTab} value="emojis">Emojis</Tab>
                <Tab currentValue={tab} onChange={setTab} value="interaction">Interaction</Tab>
                <Tab currentValue={tab} onChange={setTab} value="sentiment">Sentiment</Tab>
                <Tab currentValue={tab} onChange={setTab} value="external">External</Tab>
                <Tab currentValue={tab} onChange={setTab} value="timeline">Timeline</Tab>
                <div className="line"></div>
            </div>
        </div>
    );
};

export default Header;