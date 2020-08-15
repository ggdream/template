// go get github.com/ggdream/crypto

package crypto


import (
	"github.com/ggdream/crypto"
	"github.com/ggdream/crypto/aes"
	"github.com/ggdream/crypto/rsa"
)

func Decrypt(data interface{}) []byte {
	var key		[]byte
	var text	[]byte

	if key = rsa.Decrypt(crypto.DeBase64(data.EncKey), config.PrivateKey); key == nil{
		return nil
	}

	if text = aes.Decrypt(crypto.DeBase64(string(aes.Decrypt(crypto.DeBase64(data.EncText), key, config.IV))), config.IV, config.IV); text == nil{
		return nil
	}

	return text
}
