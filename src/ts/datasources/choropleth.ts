module powerbi.extensibility.visual.data {

    export class Choropleth extends Datasource {
        private choroplethData: any[];
        private fillColorLimits: mapboxUtils.Limits;

        constructor() {
            super('choropleth');
        }

        addSources(map, settings) {
            console.log('== Choropleth addSources ==')
            map.addSource('choropleth-source', {
                type: 'vector',
                url: settings.choropleth[`vectorTileUrl${settings.choropleth.currentLevel}`],
            });
            return map.getSource('choropleth-source');
        }

        removeSources(map) {
            console.log('== Choropleth removeSources ==')
            map.removeSource('choropleth-source');
        }

        ensure(map, layerId, settings): void {
            console.log('== Choropleth ensure ==')
            super.ensure(map, layerId, settings)
            const source: any = map.getSource('choropleth-source');
            if (!source) {
                this.addToMap(map, settings);
            }
        }

        getLimits() {
            console.log('== Choropleth getLimits ==')
            return this.fillColorLimits;
        }

        getData(map, settings) : any[] {
            console.log('== Choropleth getMapData ==')
            console.log(this.choroplethData)
            return this.choroplethData;
        }

        update(map, features, roleMap, settings) {
            console.log('== Choropleth Update ==')



            super.update(map, features, roleMap, settings)

            this.choroplethData = features.map(f => f.properties);
            this.fillColorLimits = mapboxUtils.getLimits(this.choroplethData, roleMap.color ? roleMap.color.displayName : '');
        }
    }
}
