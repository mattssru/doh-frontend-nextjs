import { IActionReducer } from "services/action.reducer";
import { ReportAction } from "./report.action";

const ReportState = {
    isLoadingFirstPage: false,
    isLoading: false,
    error: '',
    headerMembers: '',
    sumMembers: {},
    sumGroups: {},
    sumRegisterZone: [],
    sumRegisterProvinces: [],
    sumTransExercies: {},
    sumTypeExercies: [],
    sumTypeExerciesSS4: [],
    sumMembersDesc: [],
    groupsRanking: [],
    groupsCalories: [],
    groupsOfficial: [],
    sumMaps: {},
    sumGraphs: [],
    sumLungsh: {},
    filterZone: [],
    filterProvinces: [],
    filterDistricts: [],
    filterSubdistricts: [],
    filters: {
        zoneId: '',
        provinceId: '',
        districtId: '',
        subDistrictId: ''
    },
    filterZoneExercies: [],
    filterProvincesExercies: [],
    filterDistrictsExercies: [],
    filterSubdistrictsExercies: [],
    headerExercies: '',
    filtersExercies: {
        zoneIdExercies: '',
        provinceIdExercies: '',
        districtIdExercies: '',
        subDistrictIdExercies: ''
    }
};

export interface IReportState {
    isLoadingFirstPage: false,
    isLoading: false,
    error: string,
    headerMembers: string,
    sumMembers: any,
    sumGroups: any,
    sumRegisterZone: [],
    sumRegisterProvinces: [],
    sumTransExercies: any,
    sumTypeExercies: [],
    sumTypeExerciesSS4: [],
    sumMembersDesc: [],
    groupsRanking: [],
    groupsCalories: [],
    groupsEXP: [],
    groupsOfficial: [],
    sumMaps: any
    sumGraphs: [],
    sumLungsh: any
    filterZone: [],
    filterProvinces: [],
    filterDistricts: [],
    filterSubdistricts: [],
    filters: {
        zoneId: string,
        provinceId: string,
        districtId: string,
        subDistrictId: string
    },
    filterZoneExercies: [],
    filterProvincesExercies: [],
    filterDistrictsExercies: [],
    filterSubdistrictsExercies: [],
    headerExercies: string,
    filtersExercies: {
        zoneIdExercies: string,
        provinceIdExercies: string,
        districtIdExercies: string,
        subDistrictIdExercies: string
    }
}

const reportReducer = (state = ReportState, e: IActionReducer) => {
  switch (e.type) {
    case ReportAction.FETCH_SUM_MEMBER_S: {
        const { data } = e.payload;
        return { ...state, sumMembers: data }
    }
    case ReportAction.FETCH_SUM_GRAPHS_S: {
        const { data } = e.payload;
        return { ...state, sumGraphs: data }
    }
    case ReportAction.FETCH_SUM_REGISTER_ZONE_S: {
        const { data } = e.payload;
        return { ...state, sumRegisterZone: data }
    }
    case ReportAction.FETCH_SUM_REGISTER_PROVINCES_S: {
        const { data } = e.payload;
        return { ...state, sumRegisterProvinces: data }
    }
    case ReportAction.FETCH_SUM_TRANS_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, sumTransExercies: data }
    }
    case ReportAction.FETCH_SUM_TYPE_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, sumTypeExercies: data }
    }
    case ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_S: {
        const { data } = e.payload;
        return { ...state, sumTypeExerciesSS4: data, isLoading: false }
    }
    case ReportAction.FETCH_SUM_MEMBER_DESC_S: {
        const { data } = e.payload;
        return { ...state, sumMembersDesc: data, isLoading: false }
    }
    case ReportAction.FETCH_SUM_LUNGSH_S: {
        const { data } = e.payload;
        return { ...state, sumLungsh: data }
    }
    case ReportAction.FETCH_SUM_GROUPS_S: {
        const { data } = e.payload;
        return { ...state, sumGroups: data }
    }
    case ReportAction.FETCH_GROUPS_RANKING_S: {
        const { data } = e.payload;
        return { ...state, groupsRanking: data }
    }
    case ReportAction.FETCH_GROUPS_EXP_S: {
        const { data } = e.payload;
        return { ...state, groupsEXP: data }
    }
    case ReportAction.FETCH_GROUPS_CALORIES_S: {
        const { data } = e.payload;
        return { ...state, groupsCalories: data }
    }
    case ReportAction.FETCH_GROUPS_OFFICIAL_S: {
        const { data } = e.payload;
        return { ...state, groupsOfficial: data }
    }
    case ReportAction.FILTER_S: {
        const data = e.payload;
        return { ...state, filters: { ...state.filters, ...data } }
    }
    case ReportAction.FETCH_FILTER_ZONE_S: {
        const { data } = e.payload;
        return { ...state, filterZone: data.items }
    }
    case ReportAction.FETCH_FILTER_PROVINCES_S: {
        const { data } = e.payload;
        return { ...state, filterProvinces: data }
    }
    case ReportAction.FETCH_FILTER_DISTRICTS_S: {
        const { data } = e.payload;
        return { ...state, filterDistricts: data }
    }
    // Exercies
    case ReportAction.FILTER_EXERCIES_S: {
        const data = e.payload;
        return { ...state, filtersExercies: { ...state.filtersExercies, ...data } }
    }
    case ReportAction.FETCH_FILTER_ZONE_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, filterZoneExercies: data.items }
    }
    case ReportAction.FETCH_FILTER_PROVINCES_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, filterProvincesExercies: data }
    }
    case ReportAction.FETCH_FILTER_DISTRICTS_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, filterDistrictsExercies: data }
    }
    case ReportAction.FETCH_FILTER_SUBDISTRICTS_EXERCIES_S: {
        const { data } = e.payload;
        return { ...state, filterSubdistrictsExercies: data }
    }
    case ReportAction.HEADER_EXERCIES_S: {
        const data = e.payload;
        return { ...state, headerExercies: data }
    }
    // End Exercies
    case ReportAction.HEADER_MEMBER_S: {
        const data = e.payload;
        return { ...state, headerMembers: data }
    }
    case ReportAction.IS_LOADING_FIRSTPAGE_S: {
        const { isLoadingFirstPage } = e.payload;
        return { ...state, isLoadingFirstPage }
    }
    case ReportAction.IS_LOADING_S: {
        const { isLoading } = e.payload;
        return { ...state, isLoading }
    }
    default:
      return state;
  }
};

export default reportReducer;