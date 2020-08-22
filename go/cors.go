package main

import "strings"


func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", strings.Join(config.CORS, ","))
		c.Header("Access-Control-Allow-Methods", "GET,POST,POTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Length,token")
		c.Header("Access-Control-Expose-Headers", "Content-Length")
		c.Header("Access-Control-Max-Age", "172800")
		c.Header("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS"{
			c.AbortWithStatus(204)
		}
		c.Next()
	}
}
