
export function CompareColorMatrix (srcMatrix: Float32Array, srcOffset: Float32Array, targetMatrix: Float32Array, targetOffset: Float32Array): boolean
{
    for (let i = 0; i < srcOffset.length; i++)
    {
        if (srcOffset[i] !== targetOffset[i])
        {
            return false;
        }
    }

    for (let i = 0; i < srcMatrix.length; i++)
    {
        if (srcMatrix[i] !== targetMatrix[i])
        {
            return false;
        }
    }

    return true;
}
