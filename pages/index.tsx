import Form from "@/components/Form";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
     <Header showBackArrow label="Home"/>
     <Form placeholder="What's happening?"/>
     <PostFeed />
    </>
  )
}
