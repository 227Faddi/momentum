import { LinkButton } from '../components/Button';

const HomePage = () => {
    return (
        <div className="text-center flex flex-col justify-center items-center flex-grow pb-5 my-5">
            <p className="lg:w-1/2 sm:text-6xl text-3xl my-3 px-3">
                Set Your Goals, Achieve Success, and Earn Points for Every Milestone You
                Reach. Start Planning Today!
            </p>
            <div className="flex gap-4 my-4">
                <LinkButton route={'/login'} text={'Login'} />
                <LinkButton route={'/signup'} text={'Sign Up'} />
            </div>
        </div>
    )
}

export default HomePage