import { ITeamList } from "@/app/types/components/About";
import { TeamInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TeamInitialData = {
    isOpen: false,
    teamListItem: null,
    teamModalList: []
};

const TeamSlice = createSlice({
    name: "TeamSlice",
    initialState,
    reducers: {
        setTeamModal: (state: TeamInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setTeamModalList: (state: TeamInitialData = initialState, action: PayloadAction<ITeamList[]>) => {
            state.teamModalList = action.payload;
        },
        setTeamListItem: (state: TeamInitialData = initialState, action: PayloadAction<ITeamList | null>) => {
            state.teamListItem = action.payload
        },
    }
});

export const { setTeamModal, setTeamModalList, setTeamListItem } = TeamSlice.actions;
export default TeamSlice.reducer;
