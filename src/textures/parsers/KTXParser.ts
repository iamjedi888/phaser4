import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';

export function KTXParser (data: ArrayBuffer): IGLTextureBindingConfig
{
    const idCheck = [ 0xab, 0x4b, 0x54, 0x58, 0x20, 0x31, 0x31, 0xbb, 0x0d, 0x0a, 0x1a, 0x0a ];

    const id = new Uint8Array(data, 0, 12);

    for (let i = 0; i < id.length; i++)
    {
        if (id[i] !== idCheck[i])
        {
            console.error('KTXParser - Invalid file format');

            return;
        }
    }

    const size = Uint32Array.BYTES_PER_ELEMENT;

    const head = new DataView(data, 12, 13 * size);

    const littleEndian = (head.getUint32(0, true) === 0x04030201);

    const glType = head.getUint32(1 * size, littleEndian);

    if (glType !== 0)
    {
        console.warn('KTXParser - Only compressed formats supported');

        return;
    }

    const internalFormat = head.getUint32(4 * size, littleEndian);
    const width = head.getUint32(6 * size, littleEndian);
    const height = head.getUint32(7 * size, littleEndian);

    // const numberOfFaces = head.getUint32(10 * size, littleEndian);
    const mipmapLevels = Math.max(1, head.getUint32(11 * size, littleEndian));

    const bytesOfKeyValueData = head.getUint32(12 * size, littleEndian);

    const mipmaps = new Array(mipmapLevels);

    let offset = 12 + 13 * 4 + bytesOfKeyValueData;
    let levelWidth = width;
    let levelHeight = height;

    for (let i = 0; i < mipmapLevels; i++)
    {
        const levelSize = new Int32Array(data, offset, 1)[0];

        // levelSize field
        offset += 4;

        mipmaps[i] = new Uint8Array(data, offset, levelSize);

        offset += levelSize;

        // add padding for odd sized image
        offset += 3 - ((levelSize + 3) % 4);

        // mipmaps[i] = new Uint8Array(image.buffer, image.byteOffset + offset, levelSize);

        // for (let face = 0; face < out.numberOfFaces; face++) {
        //     const data = new Uint8Array(buffer, offset, levelSize);
        //     out.mipmaps.push({ data, width, height });
        //     offset += levelSize;
        //     offset += 3 - ((levelSize + 3) % 4); // add padding for odd sized image
        // }

        levelWidth = Math.max(1, levelWidth >> 1);
        levelHeight = Math.max(1, levelHeight >> 1);
    }

    return {
        mipmaps,
        width,
        height,
        internalFormat,
        compressed: true,
        generateMipmap: false
    };
}
