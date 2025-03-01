import Header from "./Header"
import Menu from "./Menu"

export default function PageLayout({content}) {
    return <div>
        <Header />
        <div className="grid grid-cols-[1fr_4fr] gap-1 min-h-screen px-6">
        <Menu />
        {content}
        </div>
    </div>
}