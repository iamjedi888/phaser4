import { DeleteGLBuffer } from './DeleteGLBuffer';
import { IIndexedVertexBuffer } from './IIndexedVertexBuffer';
import { IVertexBufferConfig } from './IVertexBufferConfig';
import { VertexBuffer } from './VertexBuffer';
import { gl } from '../GL';

export class IndexedVertexBuffer extends VertexBuffer implements IIndexedVertexBuffer
{
    /**
     * The size, in bytes, per entry in the element index array.
     *
     * @type {number}
     */
    indexSize: number;

    /**
     * The total number of entries per entry in the element index array.
     *
     * For a quad, the IBO contains 6 entries per entry:
     *
     * 0, 1, 2
     * 2, 3, 0
     *
     * @type {number}
     */
    entryIndexSize: number;

    /**
     * The Element Array Buffer.
     *
     * @type {Uint16Array}
     */
    index: Uint16Array;

    /**
     * The element array buffer.
     *
     * @type {WebGLBuffer}
     */
    indexBuffer: WebGLBuffer;

    indexLayout: number[];

    constructor (config: IVertexBufferConfig = {})
    {
        super(config);

        const {
            indexSize = 4,
            entryIndexSize = 6,
            indexLayout = null
        } = config;

        this.indexed = true;

        this.indexSize = indexSize;
        this.entryIndexSize = entryIndexSize;

        const seededIndexBuffer = [];

        if (indexLayout)
        {
            this.indexLayout = indexLayout;

            //  Seed the index buffer
            for (let i = 0; i < (this.batchSize * indexSize); i += indexSize)
            {
                for (let c = 0; c < indexLayout.length; c++)
                {
                    seededIndexBuffer.push(i + indexLayout[c]);
                }
            }
        }

        // this.create();

        this.createIndexBuffer(seededIndexBuffer);
    }

    createIndexBuffer (seededIndex: number[]): void
    {
        this.index = new Uint16Array(seededIndex);

        this.indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);

        //  Free memory
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        seededIndex = [];
    }

    bind (): void
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    }

    destroy (): void
    {
        super.destroy();

        DeleteGLBuffer(this.indexBuffer);

        this.index = null;
        this.indexLayout = null;
        this.indexBuffer = null;
    }
}
