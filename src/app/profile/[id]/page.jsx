



export default function UserProfile ({params}){
    return <div className="flex flex-col  items-center min-h-screen py-2 justify-center">
        <h1>Profile</h1>
        <hr/>
        <p>
            Profile page {params.id}
        </p>
    </div>
}