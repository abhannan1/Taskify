for server component
const {userId} = auth()
const user = await currentUser()


for client component
const {userId} = useAuth()
const {user}  = useUser()

user.firstName 
etc