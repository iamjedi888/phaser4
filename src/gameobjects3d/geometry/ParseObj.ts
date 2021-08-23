export interface IParseObjResult
{
    models: IParseObjModel[];
    materialLibraries: string[];
}

export interface IParseObjModel
{
    name: string;
    vertices: IParseObjVertex[];
    textureCoords: IParseObjTextureVertex[];
    vertexNormals: IParseObjVertex[];
    faces: IParseObjFace[];
}

export interface IParseObjFace
{
    material: string;
    group: string;
    smoothingGroup: number;
    vertices: IParseObjFaceVertexIndicies[];
}

export interface IParseObjFaceVertexIndicies
{
    vertexIndex: number;
    textureCoordsIndex: number;
    vertexNormalIndex: number;
}

export interface IParseObjVertex
{
    x: number;
    y: number;
    z: number;
}

export interface IParseObjTextureVertex
{
    u: number;
    v: number;
    w: number;
}

//  Make sure your Obj files have been exported with 'Triangulate faces' enabled

export class ParseObj
{
    private fileContents: string;
    private defaultModelName: string;
    private currentMaterial: string = '';
    private currentGroup: string = '';
    private smoothingGroup: number = 0;

    private result: IParseObjResult = {
        materialLibraries: [],
        models: []
    };

    private flipUVs: boolean;

    constructor (fileContents: string, flipUVs: boolean = true, defaultModelName: string = 'untitled')
    {
        this.fileContents = fileContents;
        this.defaultModelName = defaultModelName;
        this.flipUVs = flipUVs;
    }

    parseAsync (): Promise<IParseObjResult>
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                resolve(this.parse());
            }
            catch (theError)
            {
                reject(theError);
            }
        });
    }

    parse (): IParseObjResult
    {
        const stripComments = (line: string) =>
        {
            const commentIndex = line.indexOf('#');

            if (commentIndex > -1)
            {
                return line.substring(0, commentIndex);
            }

            return line;
        };

        const lines = this.fileContents.split('\n');

        for (const line of lines)
        {
            const strippedline = stripComments(line);

            const lineItems = strippedline
                .replace(/\s\s+/g, ' ')
                .trim()
                .split(' ');

            switch (lineItems[0].toLowerCase())
            {
                case 'o': // Start A New Model
                    this.parseObject(lineItems);
                    break;
                case 'g': // Start a new polygon group
                    this.parseGroup(lineItems);
                    break;
                case 'v': // Define a vertex for the current model
                    this.parseVertexCoords(lineItems);
                    break;
                case 'vt': // Texture Coords
                    this.parseTextureCoords(lineItems);
                    break;
                case 'vn': // Define a vertex normal for the current model
                    this.parseVertexNormal(lineItems);
                    break;
                case 's': // Smooth shading statement
                    this.parseSmoothShadingStatement(lineItems);
                    break;
                case 'f': // Define a Face/Polygon
                    this.parsePolygon(lineItems);
                    break;
                case 'mtllib': // Reference to a material library file (.mtl)
                    this.parseMtlLib(lineItems);
                    break;
                case 'usemtl': // Sets the current material to be applied to polygons defined from this point forward
                    this.parseUseMtl(lineItems);
                    break;
            }
        }

        //  Free-up memory before returning
        this.fileContents = '';

        return this.result;
    }

    private currentModel (): IParseObjModel
    {
        if (this.result.models.length === 0)
        {
            this.result.models.push({
                faces: [],
                name: this.defaultModelName,
                textureCoords: [],
                vertexNormals: [],
                vertices: []
            });

            this.currentGroup = '';
            this.smoothingGroup = 0;
        }

        return this.result.models[this.result.models.length - 1];
    }

    private parseObject (lineItems: string[]): void
    {
        const modelName = lineItems.length >= 2 ? lineItems[1] : this.defaultModelName;

        this.result.models.push({
            faces: [],
            name: modelName,
            textureCoords: [],
            vertexNormals: [],
            vertices: []
        });

        this.currentGroup = '';
        this.smoothingGroup = 0;
    }

    private parseGroup (lineItems: string[]): void
    {
        if (lineItems.length !== 2)
        {
            throw 'Group statements must have exactly 1 argument (eg. g group_1)';
        }

        this.currentGroup = lineItems[1];
    }

    private parseVertexCoords (lineItems: string[]): void
    {
        const len = lineItems.length;

        const x = (len >= 2) ? parseFloat(lineItems[1]) : 0;
        const y = (len >= 3) ? parseFloat(lineItems[2]) : 0;
        const z = (len >= 4) ? parseFloat(lineItems[3]) : 0;

        this.currentModel().vertices.push({ x, y, z });
    }

    private parseTextureCoords (lineItems: string[]): void
    {
        const len = lineItems.length;

        let u = (len >= 2) ? parseFloat(lineItems[1]) : 0;
        let v = (len >= 3) ? parseFloat(lineItems[2]) : 0;
        let w = (len >= 4) ? parseFloat(lineItems[3]) : 0;

        if (isNaN(u))
        {
            u = 0;
        }

        if (isNaN(v))
        {
            v = 0;
        }

        if (isNaN(w))
        {
            w = 0;
        }

        if (this.flipUVs)
        {
            v = 1 - v;
        }

        this.currentModel().textureCoords.push({ u, v, w });
    }

    private parseVertexNormal (lineItems: string[]): void
    {
        const len = lineItems.length;

        const x = (len >= 2) ? parseFloat(lineItems[1]) : 0;
        const y = (len >= 3) ? parseFloat(lineItems[2]) : 0;
        const z = (len >= 4) ? parseFloat(lineItems[3]) : 0;

        this.currentModel().vertexNormals.push({ x, y, z });
    }

    private parsePolygon (lineItems: string[]): void
    {
        const totalVertices = lineItems.length - 1;

        if (totalVertices < 3)
        {
            throw 'Face < 3 vertices';
        }

        const face: IParseObjFace = {
            group: this.currentGroup,
            material: this.currentMaterial,
            smoothingGroup: this.smoothingGroup,
            vertices: []
        };

        for (let i = 0; i < totalVertices; i++)
        {
            const vertexString = lineItems[i + 1];
            const vertexValues = vertexString.split('/');
            const vvLen = vertexValues.length;

            if (vvLen < 1 || vvLen > 3)
            {
                throw 'Too many / values for single vertex';
            }

            let vertexIndex = 0;
            let textureCoordsIndex = 0;
            let vertexNormalIndex = 0;

            vertexIndex = parseInt(vertexValues[0], 10);

            if (vvLen > 1 && vertexValues[1] !== '')
            {
                textureCoordsIndex = parseInt(vertexValues[1], 10);
            }

            if (vvLen > 2)
            {
                vertexNormalIndex = parseInt(vertexValues[2], 10);
            }

            if (vertexIndex === 0)
            {
                throw 'Faces uses invalid vertex index of 0';
            }

            // Negative vertex indices refer to the nth last defined vertex
            // convert these to postive indices for simplicity
            if (vertexIndex < 0)
            {
                vertexIndex = this.currentModel().vertices.length + 1 + vertexIndex;
            }

            textureCoordsIndex -= 1;
            vertexIndex -= 1;
            vertexNormalIndex -= 1;

            face.vertices.push({
                textureCoordsIndex,
                vertexIndex,
                vertexNormalIndex
            });
        }

        this.currentModel().faces.push(face);
    }

    private parseMtlLib (lineItems: string[]): void
    {
        if (lineItems.length >= 2)
        {
            this.result.materialLibraries.push(lineItems[1]);
        }
    }

    private parseUseMtl (lineItems: string[]): void
    {
        if (lineItems.length >= 2)
        {
            this.currentMaterial = lineItems[1];
        }
    }

    private parseSmoothShadingStatement (lineItems: string[]): void
    {
        if (lineItems.length !== 2)
        {
            throw 'Smoothing group statements must have exactly 1 argument (eg. s <number|off>)';
        }

        const groupNumber = lineItems[1].toLowerCase() === 'off' ? 0 : parseInt(lineItems[1], 10);

        this.smoothingGroup = groupNumber;
    }
}
