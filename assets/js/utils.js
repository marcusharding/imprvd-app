
/**
 * Determins and returns a users initials based on a given display name
 * @return { String } displayName
*/
export const getUserInitials = displayName => {

    let initials = '';

    if ( displayName ) initials = displayName.match(/\b(\w)/g).join('');

    return initials;
}

/**
 * Uses a regex check to determine if a given email address is valid
 * @param { String } email
 */
 export const validEmail = email => {

    // RFC 5322 complient regex

    const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const specialCharacters = /^[a-zA-Z0-9.@_,-]*$/;

    let valid = false;

    if ( regex.test(email) && specialCharacters.test(email) ) valid = true;

    return valid;
}