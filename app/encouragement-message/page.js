import MessageBoard from '../../components/MessageBoard'

export default function oneTwoThree() {
    return (
        <MessageBoard 
            title="Encouragement Message"
            subTitle="Encouragement.<br/>Our Love.<br/>Your Love."
            primaryColor="#f1e03a"
            headerTextColor="black"
            apiName="encouragement"
        />
    )
}