import { TGetResource } from "@lipihipi/client-sdk/dist/types";
import { IUserTestAttemptDocument} from "@lipihipi/client-sdk/dist/user-test-attempt";

export interface IDescriptiveTest{
    userTest: TGetResource<IUserTestAttemptDocument>,
    testAttemptId: string,
    submitEvaluatedAnswer: any,
    finishEvaluationAnswer: any,
    createAsset: any,
    getAssetUrl: any
}

export interface IDescriptiveTestResult{
    userTest: TGetResource<IUserTestAttemptDocument>,
    testAttemptId: string,
    getAssetUrl: any
}

