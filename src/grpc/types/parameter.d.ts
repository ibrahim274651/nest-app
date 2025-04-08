interface FiscalYearRequest {
  _id: string;
}

interface FiscalYearResponse {
  _id: string;
  designation: string;
  startDate: string;
  endDate: string;
}

interface FiscalYearService {
  getFiscalYear(data: FiscalYearRequest): Observable<FiscalYearResponse>;
}
