/**
 * Over what time frame the affinities are computed.
 * Valid values:
 *      long_term (calculated from several years of data and including all new data as it becomes available),
 *      medium_term (approximately last 6 months),
 *      short_term (approximately last 4 weeks).
 */
export default class SpotifyTopItemsTimeRange {
    private readonly timeRange: string;
    public static readonly LONG_TERM: SpotifyTopItemsTimeRange = new SpotifyTopItemsTimeRange('long_term');
    public static readonly MEDIUM_TERM: SpotifyTopItemsTimeRange = new SpotifyTopItemsTimeRange('medium_term');
    public static readonly SHORT_TERM: SpotifyTopItemsTimeRange = new SpotifyTopItemsTimeRange('short_term');

    private constructor(timeRange: string) {
        this.timeRange = timeRange;
    }

    public toString(): string {
        return this.timeRange;
    }
}