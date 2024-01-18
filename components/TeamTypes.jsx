import { useCallback, useState } from 'react'
import TeamButtons from './TeamButtons'
import TeamBox from './TeamBox'
import { fetchTeamData } from '@/utils/api';

const teamButtons = [
    { id: 'randomTeamButton', label: 'Create Random Team', container: 'teamContainer', endpoint: 'random_team' },
    { id: 'strongTeamButton', label: 'Create Strong Team', container: 'strongteamContainer', endpoint: 'strong_team' },
    { id: 'weakTeamButton', label: 'Create Weak Team', container: 'weakteamContainer', endpoint: 'weak_team' },
    { id: 'legandaryTeamButton', label: 'Create Legendary Team', container: 'legendaryteamContainer', endpoint: 'legendary_team' },
    { id: 'rainbowTeamButton', label: 'Create Rainbow Team', container: 'rainbowteamContainer', endpoint: 'rainbow_team' },
]

export default function TeamTypes({getPokemonDetails}) {
    const [teamData, setTeamData] = useState([]); //Team button results
    const [showTeamBox, setShowTeamBox] = useState(false) //Used for styling, so the team buttons move when the team box appears and disapears
    const [teamType, setTeamType] = useState('');

    const handleTeamClick = useCallback(async (targetContainer, endpoint) => {
        try {
            const teamData = await fetchTeamData(targetContainer, endpoint);
            const formattedTeamType = endpoint.replace('_team', '');
            setTeamData(teamData);
            setTeamType(formattedTeamType);
            setShowTeamBox(true);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleCloseTeamBox = () => {
        setTeamData([]);
        setShowTeamBox(false);
    };

    return (
        <div className="flex flex-col items-center md:flex-row md:items-center">
            <div className={`w-1/2 mt-4 rounded text-lg font-bold text-center md:w-auto md:w-2/6 lg:w-1/6 mx-auto ${showTeamBox ? 'md:ml-auto' : ''}`}>
                <TeamButtons buttons={teamButtons} onTeamClick={(targetContainer, endpoint) => handleTeamClick(targetContainer, endpoint)} />
            </div>
            <div className={`mt-4 rounded text-lg font-bold text-center ${showTeamBox ? 'w-3/4 mx-auto' : 'w-0'}`}>
                {showTeamBox && (
                    <TeamBox teamType={teamType} teamData={teamData} onCloseTeamBox={handleCloseTeamBox} getPokemonDetails={getPokemonDetails} />
                )}
            </div>
        </div>
    )
}
