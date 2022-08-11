import lobby from '../Config/Dictionary/Library/Lobby.json';
import notification from '../Config/Dictionary/Library/Notification.json';
import error from '../Config/Dictionary/Library/Error.json';
import navigation from '../Config/Dictionary/Library/Navigation.json';
import profile from '../Config/Dictionary/Library/Profile.json';
import company from '../Config/Dictionary/Library/Company.json';
import titles from '../Config/Dictionary/Library/Titles.json';

export default function() {
    return {
        ru: {
            titles,
            lobby,
            notification,
            error,
            navigation,
            profile,
            company
        }
    }
}