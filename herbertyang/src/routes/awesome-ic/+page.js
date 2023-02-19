export async function load ( { data, fetch }) {
    const appsReq = await fetch("https://raw.githubusercontent.com/zire/awesome-IC/main/ic/awesome_ic_apps.json")
    const apps = await appsReq.json()
    const teamsReq = await fetch("https://raw.githubusercontent.com/zire/awesome-IC/main/ic/awesome_ic_teams.json")
    const teams = await teamsReq.json()
    return {
        apps: apps,
        teams: teams
    }
}