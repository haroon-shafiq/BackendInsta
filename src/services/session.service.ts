export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface UserSession {
    state: 'PENDING' | 'ACTIVE';
    selectedDomain: string | null;
    history: ChatMessage[];
}

const sessionsMap = new Map<string, UserSession>();
export const getSession = (phoneNumber: string): UserSession => {
    if (!sessionsMap.has(phoneNumber)) {
        sessionsMap.set(phoneNumber, {
            state: 'PENDING',
            selectedDomain: null,
            history: []
        });
    }
    return sessionsMap.get(phoneNumber)!;
};

export const updateSession = (phoneNumber: string, updatedData: Partial<UserSession>): void => {
    const currentSession = getSession(phoneNumber);
    sessionsMap.set(phoneNumber, { ...currentSession, ...updatedData });
};

export const appendHistory = (phoneNumber: string, message: ChatMessage): void => {
    const session = getSession(phoneNumber);
    session.history.push(message);
    console.log("Session history", session.history)
    if (session.history.length > 6) {
        session.history = session.history.slice(-6);
    }
};

export const resetSession = (phoneNumber: string): UserSession => {
    const defaultSession: UserSession = {
        state: 'PENDING',
        selectedDomain: null,
        history: []
    };
    sessionsMap.set(phoneNumber, defaultSession);
    return defaultSession;
};
