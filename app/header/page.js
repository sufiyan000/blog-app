const Header = () => {
    return (
        <>
          <div className="p-4  bg-blue-500 sticky top-0 flex justify-between">
            <div>
                <ul className="flex gap-4 text-white">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Tech</a></li>
                    <li><a href="#">Science</a></li>
                </ul>
            </div>
            <div>
        <h1 className=" text-3xl font-bold text-white">Blog-App</h1>

            </div>
            <div>
                <ul className="flex gap-4 text-white">
                    <li><a href="/signup">Signup</a></li>
                    <li><a href="login">Login</a></li>

                    </ul>
            </div>

          </div>
        </>
    )
}
    export default Header